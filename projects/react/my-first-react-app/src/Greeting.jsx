function Greeting() {
    const dogs = ["Awaw", "Shibe", "Awaw"]

    return (
        <ol>
            {dogs.map((dog) =>
                (dog == "Awaw") && <li>{ dog }</li>
            )}
        </ol>
    )
}

export { Greeting };