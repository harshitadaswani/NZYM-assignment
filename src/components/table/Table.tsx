import React, { useMemo } from "react";
import { useTable } from "react-table";
import { IPerson } from "./TableTypes";

type Props = {
  data: IPerson[];
};

export function Table(props: Props) {
  // console.log(props);
  const data = useMemo(() => props.data, [props.data]);
  console.log(data);
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accesor: "id",
      },
      {
        Header: "Avatar",
        accesor: "image",
      },
      {
        Header: "First Name",
        accesor: "firstname",
      },
      {
        Header: "Last Name",
        accesor: "lastName",
      },
      {
        Header: "Gender",
        accesor: "gender",
      },
      {
        Header: "Age",
        accesor: "birthday",
      },
      {
        Header: "Contact",
        accesor: "phone",
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
    <table {...getTableProps()}>
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
                console.log(cell);
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
