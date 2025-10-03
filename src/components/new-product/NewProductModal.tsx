import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import {
  productFormSchema,
  type ProductFormInputs,
} from "./productSchema";
import { useCreateProduct } from "../../mutations/useProductMutations";
import { Grid } from "../grid";
import {
  CompanySelectField,
  DepositField,
  PackagingField,
  ProductNameField,
  UserSelectField,
  VolumeField,
} from "./fields";

interface NewProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewProductModal = ({
  open,
  onOpenChange,
}: NewProductModalProps) => {
  const { mutateAsync: addProduct, isPending: isAddingProduct } =
    useCreateProduct();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      packaging: "pet",
      deposit: "",
      volume: "",
      companyId: "",
      registeredById: "",
    },
  });

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      const productData = {
        name: data.name,
        packaging: data.packaging,
        deposit: Number(data.deposit),
        volume: Number(data.volume),
        companyId: Number(data.companyId),
        registeredById: Number(data.registeredById),
      };

      await addProduct(productData);
      reset();
      onOpenChange(false);
    } catch (error) {
      // Error should be handled by the mutation's onError callback
      console.error("Failed to create product:", error);
    }
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-[500px] mx-4 sm:mx-0">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl sm:text-2xl">
            Add New Product
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Create a new product entry in the system. Fill in all the required
            information.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 sm:space-y-6 flex-1"
        >
          <ProductNameField
            value={watch("name")}
            onChange={(value) => setValue("name", value)}
            error={errors.name?.message}
          />

          <PackagingField
            value={watch("packaging")}
            onChange={(value) => setValue("packaging", value as any)}
            error={errors.packaging?.message}
          />

          <Grid cols={2} mobileCols={1} gap={4}>
            <DepositField
              value={watch("deposit")}
              onChange={(value) => setValue("deposit", value)}
              error={errors.deposit?.message}
            />
            <VolumeField
              value={watch("volume")}
              onChange={(value) => setValue("volume", value)}
              error={errors.volume?.message}
            />
          </Grid>

          <Grid cols={2} mobileCols={1} gap={4}>
            <CompanySelectField
              value={watch("companyId")}
              onChange={(value) => setValue("companyId", value)}
              error={errors.companyId?.message}
            />
            <UserSelectField
              value={watch("registeredById")}
              onChange={(value) => setValue("registeredById", value)}
              error={errors.registeredById?.message}
            />
          </Grid>

          <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2 pt-4 sm:pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isAddingProduct}
              className="w-full sm:w-auto order-2 sm:order-1 h-11 sm:h-9"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isAddingProduct}
              className="w-full sm:w-auto order-1 sm:order-2 h-11 sm:h-9"
            >
              {isAddingProduct ? "Creating..." : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
