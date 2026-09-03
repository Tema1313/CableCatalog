import type { FC, PropsWithChildren } from "react";
import { useAuthForm } from "../hooks/useAuthForm";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";

interface IAuthProps extends PropsWithChildren {}

export const Auth: FC<IAuthProps> = (props) => {
	const [form, onSubmit, state] = useAuthForm();

	if (state.isLoggedIn) return props.children;

	return (
		<div className="flex h-full flex-col gap-6 items-center justify-center">
			<Card className="w-80 mx-auto flex">
				<CardContent>
					<Form {...form}>
						<form onSubmit={onSubmit} className="space-y-6">
							<FormField
								name="username"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Логин</FormLabel>
										<FormControl>
											<Input {...field} autoComplete="username" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full cursor-pointer" disabled={state.loading}>
								Войти
								{state.loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};
