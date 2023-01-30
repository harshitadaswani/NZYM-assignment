import React, { useMemo } from "react";
import { useTable, Column } from "react-table";
import { IPerson } from "./TableTypes";
import "../../index.css";

type Props = {
  data: IPerson[];
};

export function Table(props: Props) {
  const data = useMemo(() => props.data, [props.data]);
  const columns: Column<IPerson>[] = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Avatar",
        accessor: "image",
        Cell: (tableProps) => (
          <img
            className="br-full"
            src={tableProps.row.original.image}
            width={50}
            alt={
              tableProps.row.original.firstname.charAt(0) +
              tableProps.row.original.lastname.charAt(0)
            }
          />
        ),
      },
      {
        Header: "First Name",
        accessor: "firstname",
      },
      {
        Header: "Last Name",
        accessor: "lastname",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Age",
        accessor: "birthday",
      },
      {
        Header: "Contact",
        accessor: "phone",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <table className="border" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td className="border m-0" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
