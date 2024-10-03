const PastLookups = (props) => {
    // For testing a single element
    // const { pastLookup } = props
    // console.log('PastLookups.jsx - Contents of pastLookup passed as props from NumberLookup.jsx: ',pastLookup);
    // return <div>
    //     <div>dbID = {pastLookup.dbID}</div> 
    //     <div>valid = {JSON.stringify(pastLookup.valid)}</div> 
    //     <div>number = {pastLookup.number}</div>
    //     <div>country name = {pastLookup.country_name}</div>
    //     <div>location = {pastLookup.location}</div>
    //     <div>carrier = {pastLookup.carrier}</div>
    //     <div>line type = {pastLookup.line_type}</div>
    //     <br/>
    // </div>

    const { eachLookup } = props
    console.log('PastLookups.jsx - Contents of eachLookup passed as props from NumberLookup.jsx: ',eachLookup);
    return <div>
        <div>dbId = {eachLookup.dbID}</div> 
        <div>valid = {JSON.stringify(eachLookup.valid)}</div> 
        <div>number = {eachLookup.number}</div>
        <div>country name = {eachLookup.country_name}</div>
        <div>location = {eachLookup.location}</div>
        <div>carrier = {eachLookup.carrier}</div>
        <div>line type = {eachLookup.line_type}</div>
        <br/>
    </div>
}

export default PastLookups;