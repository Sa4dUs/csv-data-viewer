import { useState, useEffect } from "react";
import User from "../types/User";

export default function UserList({ items, query }: { items: User[]; query: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentItems, setCurrentItems] = useState<User[]>([]);

    const itemsPerPage = 10;

    const match = (object: User, query: string) => {
        return Object.values(object).some((value) =>
            value.toLowerCase().includes(query.toLowerCase())
        );
    };

    const fetchMoreData = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        const filteredItems = items.filter((e) => match(e, query));
        const indexOfLastItem = currentPage * itemsPerPage;
        const newCurrentItems = filteredItems.slice(0, indexOfLastItem);
        setCurrentItems(newCurrentItems);
    }, [items, query, currentPage]);

    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + document.documentElement.scrollTop ===
                    document.documentElement.offsetHeight &&
                currentItems.length < items.filter((e) => match(e, query)).length
            ) {
                fetchMoreData();
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [currentItems, items, query]);

    return (
        <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentItems.map((user, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                        <p className="text-lg font-semibold mb-2">{user.name}</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                            <span className="font-bold">City:</span> {user.city}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                            <span className="font-bold">Country:</span> {user.country}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            <span className="font-bold">Favourite Sport:</span> {user.favourite_sport}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
