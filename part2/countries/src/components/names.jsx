import CountryName from "./country"

const Names = ({ names, countryList, handleShow }) => {


    if(names == null){
        return null
    }
    if(names.length > 10){
        return (
            <div>too many matches, specify another filter</div>
        )
    } else if(names.length <= 10 && names.length > 1) {
        console.log('names12515')
        return (
            <div>
            {names.map(name => 
                <div key={name}>
                    {name}
                    <button onClick={() => handleShow(name)}>show</button>
                </div>
            )}
            </div>
        )
    } else if (names.length == 1){
        return null
    } else if(names == 0) {
        return (
            <div>no such country, try again</div>
        )
    }
}

export default Names