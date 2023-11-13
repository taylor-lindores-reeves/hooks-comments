import { useFormState, useFormStatus } from "react-dom";
import { Icons } from "./ui/icons";
import { voteAction } from "@hooks-comments/app/actions/comment.actions";
import { Button } from "./ui/button";

type VoteProps = {
	votes: number;
	id: number;
};

const Vote = (props: VoteProps) => {
	const { pending } = useFormStatus();
	const { votes, id } = props;

	const initialState = {
		message: "",
		id,
		votes
	};

	const [state, formAction] = useFormState(voteAction, initialState);

	return (
		<div className="flex flex-row-reverse md:flex-col justify-center items-center text-center rounded-lg h-10 md:h-28">
			<form>
				<input type="hidden" name="action" value="increment" />
				<Button
					formAction={formAction}
					disabled={pending}
					type="submit"
					variant="ghost"
					className="px-0"
				>
					<Icons.plus className="w-3 h-3" />
				</Button>
			</form>
			<span>{state.votes}</span>
			<form>
				<input type="hidden" name="action" value="decrement" />
				<Button
					formAction={formAction}
					disabled={pending}
					type="submit"
					variant="ghost"
					className="px-0"
				>
					<Icons.minus className="w-3 h-3" />
				</Button>
			</form>
		</div>
	);
};

export default Vote;
