import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface ICreateMaterialProps { }

const CreateMaterialSchema = z.object({
    name: z.string({ message: "Обязательное поле" }).min(1, { message: "Обязательное поле" }),
});

type CreateMaterialFormData = z.infer<typeof CreateMaterialSchema>;

export const CreateMaterial: FC<ICreateMaterialProps> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, reqSim] = useRequestSimulation()

    const form = useForm<CreateMaterialFormData>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: zodResolver(CreateMaterialSchema),
    });

    const onSubmit = (data: CreateMaterialFormData) => {
        reqSim(() => {
            console.log(data)
            toast("Technichal problems", {
                position: "top-right",
            })
        })
    };

    return (
        <Dialog
            modal
            open={open}
            onOpenChange={(open) => {
                setOpen(open);
                if (!open) form.reset();
            }}
        >
            <DialogTrigger title="Редактировать" className="cursor-pointer" asChild>
                <Button size="sm" variant="ghost" className="ml-auto green" title="Добавить">
                    <Plus color="#4082b7" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="gap-0">
                    <DialogTitle>Добавить материал</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Материал</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button size={"sm"} className="cursor-pointer" variant="outline">
                                        Отменить
                                    </Button>
                                </DialogClose>
                                <Button size={"sm"} className="cursor-pointer" type="submit">
                                    {loading ? <Loader2 className="m-2 animate-spin justify-center " /> : "Сохранить"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};