import { Card, CardContent } from "../card";
import { RecentProductsContent } from "./RecentProductsContent";

export const RecentProductsSection = () => 
    <Card className="p-6 bg-white rounded-xl border shadow-sm">
      <CardContent className="p-0">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent products
          </h3>
            <RecentProductsContent />
        </div>
      </CardContent>
    </Card>
