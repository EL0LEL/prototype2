/**
 * DataTableGrid.jsx
 * Tabel data bergaya spreadsheet iPOS 5 dengan header navy dan scroll lancar.
 */

import React from 'react';

export const DataTableGrid = ({ columns = [], data = [], emptyMessage = 'Tidak ada data ditemukan' }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#ece4d6] bg-[#ffffff]">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#fbf8f2] text-[#4a453f] border-b border-[#ece4d6] sticky top-0 uppercase tracking-wider text-[11px]">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-2.5 px-3 font-semibold ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ece4d6]/60 text-[#2f2c28]">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-[#738876]">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={row.id || rowIdx}
                className="hover:bg-[#d7f4f2]/15 transition-colors odd:bg-[#ffffff] even:bg-[#fbf8f2]/50"
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={`py-2 px-3 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${col.className || ''}`}
                  >
                    {col.render ? col.render(row, rowIdx) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
