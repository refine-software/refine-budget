import { JSX, memo } from "react";
import next from "/next.png"
import last from "/right-arrow.png"

type Props = {
    currentPage: number;
    pages: number;
    setPage: (page: number) => void;
}

const Pagination = memo(({ currentPage, pages, setPage }: Props) => {
    const paginationButtons: JSX.Element[] = [];

    if (currentPage === 1) {
        for (let i = 1; i <= pages && i <= 3; i++) {
            paginationButtons.push(
                <button
                    className={`${i === currentPage ? "border-primary text-primary" : "border-white"} p-1 w-10 border  aspect-square font-bold rounded-sm cursor-pointer`}
                    onClick={() => { setPage(i) }}
                    key={i}
                >
                    {i}
                </button>
            )
        }
    }
    else if (currentPage === pages) {
        for (let i = pages === 2 ? currentPage - 1 : currentPage - 2; i <= currentPage; i++) {
            paginationButtons.push(
                <button
                    className={`${i === currentPage ? "border-primary text-primary" : "border-white"} p-1 w-10 border  aspect-square font-bold rounded-sm cursor-pointer`}
                    onClick={() => { setPage(i) }}
                    key={i}
                >
                    {i}
                </button>
            )
        }
    } else {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            paginationButtons.push(
                <button
                    className={`${i === currentPage ? "border-primary text-primary" : "border-white"} p-1 w-10 border  aspect-square font-bold rounded-sm cursor-pointer`}
                    onClick={() => { setPage(i) }}
                    key={i}
                >
                    {i}
                </button>
            )
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex justify-center items-center gap-2">
                <button
                    className={`border border-white w-10 aspect-square flex justify-center items-center rounded-sm ${currentPage === 1 ? "bg-grey cursor-not-allowed" : "bg-primary"}`}
                    onClick={() => setPage(1)}
                    disabled={currentPage === 1}
                >
                    <img src={last} alt="last page" className="w-8 rotate-180" />
                </button>
                <button onClick={() => setPage(currentPage - 1)} className={`border border-white w-10 aspect-square flex justify-center items-center rounded-sm ${currentPage === 1 ? "bg-grey cursor-not-allowed" : "bg-primary"}`} disabled={currentPage === 1}>
                    <img src={next} alt="previous page" className="w-8 rotate-180" />
                </button>
                {paginationButtons}
                <button onClick={() => setPage(currentPage + 1)} className={`border border-white w-10 aspect-square flex justify-center items-center rounded-sm ${currentPage >= pages ? "bg-grey cursor-not-allowed" : "bg-primary"}`} disabled={currentPage === pages}>
                    <img src={next} alt="next page" className="w-8" />
                </button>
                <button
                    className={`border border-white w-10 aspect-square flex justify-center items-center rounded-sm ${currentPage >= pages ? "bg-grey cursor-not-allowed" : "bg-primary"}`}
                    onClick={() => setPage(pages)}
                    disabled={currentPage === pages}
                >
                    <img src={last} alt="last page" className="w-8" />
                </button>
            </div>
            <p className="opacity-75">{currentPage} out of {pages}</p>
        </div>
    );
});

export default Pagination;
