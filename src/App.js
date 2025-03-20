import "./App.css";
import video from "./asset/bg.mp4";
import Weather from "./component/Weather";

function App() {
  return (
    <div className=" w-full h-dvh overflow-auto">
      {/* Background Video */}
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src={video} type="video/mp4" />
      </video>

      <div className="relative z-10  items-center justify-center h-full p-10 text-white font-bold">
        <Weather />
      </div>

    </div>
  );
}

export default App;

