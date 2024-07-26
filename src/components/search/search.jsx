

export const Search = (props) => {
    return (
      <>
      <form>
        <input
          placeholder="Search for..."
          onChange={(event)=>props.callback(event.target.value)}
        />
      </form>
      </>
    )}