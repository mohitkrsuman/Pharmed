import { ReactElement, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Link } from "react-router-dom";
import { Column } from "react-table";

type DataType = {
  _id: string;
  quantity: number;
  amount: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {

  const [rows, setRows] = useState<DataType[]>([{
    _id: "1vfsbs",
    quantity: 2,
    discount: 0,
    amount: 200,
    status: <span className="badge badge-success">Processing</span>,
    action: (
      <Link to={`/order/1`}>View</Link>
    ),
  }]);
  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    true
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {Table}
    </div>
  );
};

export default Orders;
