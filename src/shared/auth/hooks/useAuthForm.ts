
import z from "zod";
import { useAuth } from "./useAuth";
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AuthSchema = z.object({
    username: z.string().min(3, { message: "Введите логин" }),
});

type AuthFormData = z.infer<typeof AuthSchema>;

export const useAuthForm = () => {
    const auth = useAuth()
    const [loading, reqSim] = useRequestSimulation()

    const form = useForm<AuthFormData>({
        mode: "onBlur",
        reValidateMode: "onChange",
        resolver: zodResolver(AuthSchema),
        defaultValues: {
            username: "",
        },
    });

    const onSubmit: SubmitHandler<AuthFormData> = async (data) => {
        await reqSim(() => auth.setLogin(data.username), 2000)
    }

    return [
        form,
        form.handleSubmit(onSubmit),
        {
            isLoggedIn: auth.isLoggedIn,
            loading,
        }
    ] as const
}