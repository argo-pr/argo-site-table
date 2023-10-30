import {Data, DataTable} from "@/components/DataTable";

export default function UserPage(props: { params: { data: Data[] } }) {
    console.log(props);
    return <>
        <DataTable data={props.params.data}/>
    </>
}