import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { Icon } from "@blueprintjs/core";

export default function PatientsTable({ columns, data }: {columns: any[], data: any[]}) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  }, useSortBy);

  return (
    <div className="tbl-header">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  
                  {column.render('Header')}

                  {/* Add a sort direction indicator */}
                  
                  <span>

                    <Icon icon={column.isSorted ? column.isSortedDesc ? 'caret-down' : 'caret-up' : 'double-caret-vertical'} />
                  </span>

                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
