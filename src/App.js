import "./App.css";

function App() {
  return (
    <div>
      <h3>Add to reading list</h3>
      <form>
        <select name="lists">
          <option value="shortform">Shortform</option>
          <option value="blockchain">Blockchain</option>
          <option value="press">Press</option>
        </select>

        <label>URL</label>
        <input type="text"></input>
      </form>
    </div>
  );
}

export default App;
