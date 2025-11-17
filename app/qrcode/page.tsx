import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function QrCodeGenerator(){
    return(
        <div className="flex w-full max-w-sm items-center gap-2">
            <Input type="text" placeholder="Text or Link" ></Input>
            <Button type="submit" >
                Generate
            </Button>

        </div>
    )
}