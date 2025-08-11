import axios from "axios";
import { useEffect, useState } from "react";

export function useBookSearch(query: string, pageNumber: number ){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [books,setBooks] = useState<string[]>([])
    const [hasMore,setHasMore] = useState(true)

    // every time we change our query, we set books to []
    useEffect(() => {
            setBooks([])
    },[query])

    useEffect(()=> {
        setLoading(true)
       axios({
        method: 'GET',
        url: 'http://openlibrary.org/search.json',
        params: {q: query,page: pageNumber}
       }).then((res) => {
        setBooks((prevBooks) => {
            return [...new Set([...prevBooks, ...res.data.docs.map((b:any) => b.title)])]
        })
        setHasMore(res.data.docs.length > 0)
        setLoading(false)
       }).catch(() => setError(true))
    },[query,pageNumber])

    return {books,loading,error,hasMore}
}