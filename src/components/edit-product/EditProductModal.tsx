import { useEffect } from "react";
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
import { productEditSchema, type ProductEditInputs } from "./productEditSchema";
import { useUpdateProduct } from "../../mutations/useProductMutations";
import { Grid } from "../grid";
import {
  DepositField,
  PackagingField,
  ProductNameField,
  VolumeField,
} from "../new-product/fields";
import type { Product } from "../../types/api";

interface EditProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditProductModal = ({
  product,
  open,
  onOpenChange,
}: EditProductModalProps) => {
  const { mutateAsync: updateProduct, isPending: isUpdating } =
    useUpdateProduct();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductEditInputs>({
    resolver: zodResolver(productEditSchema),
    defaultValues: {
      name: "",
      packaging: "pet",
      deposit: "",
      volume: "",
    },
  });

  // Populate form when product changes
  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("packaging", product.packaging);
      setValue("deposit", String(product.deposit));
      setValue("volume", String(product.volume));
    }
  }, [product, setValue]);

  const onSubmit = async (data: ProductEditInputs) => {
    if (!product) return;
    try {
      await updateProduct({
        id: product.id,
        name: data.name,
        packaging: data.packaging,
        deposit: Number(data.deposit),
        volume: Number(data.volume),
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update product:", error);
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
            Edit Product
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Update the product details below. Company and registered user cannot
            be changed after creation.
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

          <DialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2 pt-4 sm:pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isUpdating}
              className="w-full sm:w-auto order-2 sm:order-1 h-11 sm:h-9"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="w-full sm:w-auto order-1 sm:order-2 h-11 sm:h-9"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
