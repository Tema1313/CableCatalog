import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useAuth } from "./useAuth";

const AuthSchema = z.object({
    username: z.string().min(3, { message: "Введите логин" }),
});

type AuthFormData = z.infer<typeof AuthSchema>;

export const useAuthForm = () => {
    const auth = useAuth()

    const form = useForm<AuthFormData>({
        mode: "onBlur",
        reValidateMode: "onChange",
        resolver: zodResolver(AuthSchema),
        defaultValues: {
            username: "",
        },
    });

    const onSubmit: SubmitHandler<AuthFormData> = (data) => {
        auth.login(data.username)
    }

    return {
        form,
        onSubmit,
        state: {
            isLoggedIn: auth.userName
        }
    }
}