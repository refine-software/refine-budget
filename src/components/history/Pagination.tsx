import { JSX, memo } from "react";
import back from "/Vector.svg"

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
                <button onClick={() => setPage(1)} className={`border border-white w-10 aspect-square flex justify-center items-center rounded-sm ${currentPage === 1 ? "bg-grey cursor-not-allowed" : "bg-primary"}`} disabled={currentPage === 1}>
                    <img src={back} alt="go back" className="w-3" />
                </button>
                {paginationButtons}
                <button onClick={() => setPage(pages)} className={`border border-white w-10 aspect-square flex justify-center items-center rounded-sm ${currentPage >= pages ? "bg-grey cursor-not-allowed" : "bg-primary"}`} disabled={currentPage === pages}>
                    <img src={back} alt="go forward" className="w-3 rotate-180" />
                </button>
            </div>
            <p className="opacity-75">{currentPage} out of {pages}</p>
        </div>
    );
});

export default Pagination;
