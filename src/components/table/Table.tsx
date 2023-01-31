import React, { useMemo } from "react";
import { useTable, Column, useSortBy } from "react-table";
import { IPerson } from "./TableTypes";
import "../../index.css";

type Props = {
  data: IPerson[];
};

export function Table(props: Props) {
  const ageFromDOB: any = (dateofBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateofBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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
        Cell: (tableProps) => (
          <div>{ageFromDOB(tableProps.row.original.birthday)}</div>
        ),
      },
      {
        Header: "Contact",
        accessor: "phone",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <table className="border" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                </span>
              </th>
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
