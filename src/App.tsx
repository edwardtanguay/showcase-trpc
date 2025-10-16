import { CreateUser } from "./components/CreateUser";
import { ShowUsers } from "./components/ShowUsers";

function App() {
	return (
		<main className="w-full md:bg-slate-100 md:mx-auto md:w-[80%] md:mt-6 md:rounded md:max-w-5xl">
			<div className="p-8">
				<h1 className="text-2xl mb-3">tRPC Client</h1>
				<ShowUsers />
				<CreateUser />
			</div>
		</main>
	);
}

export default App;
