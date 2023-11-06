import { useSearchParams } from "react-router-dom";


function UseurlPosition() {

    const [searchParams] = useSearchParams()
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    return [lat, lng]
}

export { UseurlPosition };

