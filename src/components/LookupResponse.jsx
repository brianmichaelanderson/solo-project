const LookupResponse = (props) => {
    const { apiData } = props;
    console.log('LookupResponse.jsx - Contents of apiData passed as props from NumberLookup.jsx: ',apiData);
    return <div>
        <div>valid = {JSON.stringify(apiData.valid)}</div> 
        <div>number = {apiData.number}</div>
        <div>country name = {apiData.country_name}</div>
        <div>location = {apiData.location}</div>
        <div>carrier = {apiData.carrier}</div>
        <div>line type = {apiData.line_type}</div>
    </div>
}
export default LookupResponse;