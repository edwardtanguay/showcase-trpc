import { useState } from "react";
import { trpc } from "../utils/trpc";

export const ShowUsers = () => {
	const info = trpc.getInfo.useQuery();
	const users = trpc.getUsers.useQuery();
	const [userId, setUserId] = useState("4");
	const user = trpc.userById.useQuery(userId, {
		enabled: !!userId,
	});

	return (
		<>
			<div className="mb-6">
				<p>Version: {info.data?.version}</p>
			</div>

			<section className="mb-8 p-4 border rounded">
				<h2 className="text-xl font-semibold mb-2">Users</h2>
				{users.isLoading ? (
					<p>Loading...</p>
				) : (
					<ul>
						{users.data?.map((user) => (
							<li key={user.id}>
								{user.name} (ID: {user.id})
							</li>
						))}
					</ul>
				)}
			</section>

			<section className="mb-8 p-4 border rounded">
				<h2 className="text-xl font-semibold mb-2">Select User</h2>
				{users.isLoading ? (
					<p>Loading users...</p>
				) : (
					<select
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						className="border px-2 py-1 rounded"
					>
						<option value="">Choose a user...</option>
						{users.data?.map((u) => (
							<option key={u.id} value={u.id}>
								{u.name}
							</option>
						))}
					</select>
				)}

				{userId && (
					<div className="mt-4">
						{user.isLoading ? (
							<p>Loading user details...</p>
						) : (
							<pre className="p-2 rounded overflow-auto font-mono text-xs">
								{JSON.stringify(user.data, null, 2)}
							</pre>
						)}
					</div>
				)}
			</section>
		</>
	);
};
