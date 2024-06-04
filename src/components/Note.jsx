

const Note = ({ person, toggleImportance, removePerson }) => {
  const label = person.important
    ? "make not important" : "make important"
  return (
    <>
    <div className="card w-96 bg-base-100 shadow-xl ">
    <div className="card-body">
      <h2 className="card-title">{person.name}</h2>
      <p>{person.number}</p>
      <div className="card-actions justify-end">
      <button className='btn btn-secondary' onClick={toggleImportance}>{label}</button> <button className='btn btn-accent' onClick={removePerson}>delete</button>
      </div>
    </div>
  </div>
  </>
  )
}

export default Note