import { Plus } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { Button } from "../button";
import { Card, CardContent } from "../card";
import { NewProductModal } from "../new-product/NewProductModal";

export const QuickActionsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card className="p-6 bg-white rounded-xl border shadow-sm">
        <CardContent className="p-0">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Quick actions
            </h3>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/products">
                  <Plus size={16} />
                  View all products
                </Link>
              </Button>
              <Button
                variant="default"
                className="flex items-center gap-2 bg-black hover:bg-gray-800"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus size={16} />
                Add new product
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <NewProductModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};
