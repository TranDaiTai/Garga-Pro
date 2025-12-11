export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      const show =
        i === 1 ||
        i === totalPages ||
        Math.abs(i - currentPage) <= 1;

      if (show) {
        pages.push({ type: "page", value: i });
      } else if (
        (i === 2 && currentPage > 3) ||
        (i === totalPages - 1 && currentPage < totalPages - 2)
      ) {
        pages.push({ type: "dots", value: "..." });
      }
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex flex-col items-center gap-4 pt-8 border-t border-border">
      <div className="text-sm text-muted-foreground">
        Trang {currentPage} / {totalPages}
      </div>

      <div className="flex items-center gap-2">
        {/* Nút trước */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded border border-border text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Trước
        </button>

        {/* Các số trang */}
        {pages.map((p, index) =>
          p.type === "page" ? (
            <button
              key={index}
              onClick={() => onPageChange(p.value)}
              className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                currentPage === p.value
                  ? "bg-accent text-accent-foreground"
                  : "border border-border text-foreground hover:bg-secondary"
              }`}
            >
              {p.value}
            </button>
          ) : (
            <span key={index} className="px-2">
              ...
            </span>
          )
        )}

        {/* Nút sau */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded border border-border text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
