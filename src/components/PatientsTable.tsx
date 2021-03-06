import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import {
  Icon,
  Button,
  NumericInput,
  ControlGroup,
  FormGroup,
  Tag,
} from '@blueprintjs/core';
import Patient from '../DataModel/Patient';

/**
 * Display a table with defined columns and data
 * This table provides sorting and pagination
 *
 * @param {{
 *   columns: any[];
 *   data: Patient[];
 *   onClickRow: (row: Patient) => void;
 *   noDataMessage: string
 * }} {
 *   columns,
 *   data,
 *   onClickRow,
 *   noDataMessage
 * }
 * @returns
 */
function PatientsTable({
  columns,
  data,
  onClickRow,
  noDataMessage
}: {
  columns: any[];
  data: Patient[];
  onClickRow: (row: Patient) => void;
  noDataMessage: string
}) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      autoResetPage: false,
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <div className="tbl-header" id="patient-table">
        <table {...getTableProps()} cellSpacing={0}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}

                    {/* Add a sort direction indicator */}
                    <span>
                      <Icon
                        icon={
                          column.isSorted
                            ? column.isSortedDesc
                              ? 'caret-down'
                              : 'caret-up'
                            : 'double-caret-vertical'
                        }
                      />
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={row.original.id}
                  onClick={() => onClickRow(row.original)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Show this row when there is no data (noDataMessage) */}
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                { data.length === 0 ? noDataMessage : `Showing ${pageIndex*pageSize + 1} to ${pageIndex*pageSize + page.length} of ${data.length} results`}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination controls */}
        <ControlGroup fill={true} className="pagination-toolbar">
          <div>
            <Button
              icon="double-chevron-left"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />{' '}
            <Button
              icon="chevron-left"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />{' '}
            <Button
              icon="chevron-right"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />{' '}
            <Button
              icon="double-chevron-right"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            />{' '}
          </div>

          <FormGroup inline={true} label="Page">
            <NumericInput
              min={1}
              max={pageOptions.length ? pageOptions.length : 1}
              value={pageIndex + 1}
              rightElement={<Tag minimal={true}>of {pageOptions.length}</Tag>}
              onValueChange={(valueAsNumber: number) => {
                const page = valueAsNumber - 1;
                gotoPage(page);
              }}
              style={{ width: '80px' }}
            />
          </FormGroup>

          <div className="bp3-html-select">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            <Icon icon="caret-down" />
          </div>
        </ControlGroup>
      </div>
    </div>
  );
}

export default React.memo(PatientsTable);
