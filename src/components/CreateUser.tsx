import { useState } from "react";
import { trpc } from "../utils/trpc";

export const CreateUser = () => {
	const [newName, setNewName] = useState("");
	const users = trpc.getUsers.useQuery();
	const createUser = trpc.userCreate.useMutation({
		onSuccess: () => {
			users.refetch();
		},
	});

	return (
		<>
			<section className="p-4 border rounded">
				<h2 className="text-xl font-semibold mb-2">Create User</h2>
				<input
					type="text"
					value={newName}
					onChange={(e) => setNewName(e.target.value)}
					placeholder="User name"
					className="border px-2 py-1 mr-2"
				/>
				<button
					onClick={() => createUser.mutate({ name: newName })}
					disabled={createUser.isPending}
					className="bg-blue-500 text-white px-4 py-1 rounded"
				>
					{createUser.isPending ? "Creating..." : "Create"}
				</button>
			</section>
		</>
	);
};
