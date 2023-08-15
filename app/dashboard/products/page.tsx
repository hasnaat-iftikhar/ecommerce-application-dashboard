import React from "react";

// Components
import ProductsTable from "@/components/dashboard/ProductsTable";
import CreateProductModal from "@/components/modals/CreateProductModal";

const Products = () => {
  return (
    <section className="flex flex-col gap-2">
      <CreateProductModal />
      <ProductsTable />
    </section>
  );
};

export default Products;
