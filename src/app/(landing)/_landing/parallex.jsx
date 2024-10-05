"use client";

// import { Input } from "../ui/input";
import { Input } from "@/components/ui/input";
// import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";
import { createSecondOpinion } from "@/components/component/_actions";
import { toast } from "sonner";
import { useEffect } from "react";
import { SubmitButton } from "@/components/component/submit-button";
const initialState = {
  message: "",
};

export function Parallex() {
  const [state, formAction] = useFormState(createSecondOpinion, initialState);
  useEffect(() => {
    if (state.message) {
      // console.log(state.message);
      toast(`${state.message}`, {
        // description: "Sunday, December 03, 2023 at 9:00 AM",
      });
    }
  }, [state.message]);

  return (
    <div className=" w-full bg-fixed bg-center bg-no-repeat bg-cover min-h-[350px] relative bg-[url('/manInBlack.jpg')]">
      <div className="absolute min-h-full w-full bg-black/60" />
      <div className="absolute w-full min-h-full flex flex-col justify-center items-center">
        <div className="container mx-auto">
          <p className="font-extrabold text-center text-xl text-gray-300">
            Get FREE consultation from our experts.
          </p>
          <div className="flex flex-col w-full justify-center items-center">
            <form
              className="flex flex-col sm:flex-row p-5 gap-5 justify-center items-center "
              action={formAction}
            >
              <Input
                type="number"
                placeholder="Phone Number"
                name="phoneNumber"
              />
              {state?.errors?.requestFor && (
                <p className="text-sm text-red-700" aria-live="polite">
                  {state.errors.requestFor}
                </p>
              )}
              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
    </div>
    // <div
    //   className={`bg-fixed bg-center bg-no-repeat bg-cover min-h-[350px] relative bg-blue-400 bg-[url('/male1.jpg')]`}
    // >
    //   <div className="absolute min-h-full w-full bg-black/60" />
    //   <div className="absolute flex flex-col min-h-full justify-evenly w-full items-center bg-green-600">
    //     <p className="font-extrabold text-center text-3xl">
    //       Get FREE consultation from our experts.
    //     </p>
    //     <div className="flex flex-col w-full justify-center items-center bg-purple-500">
    //       <form
    //         className="flex flex-col sm:flex-row p-5 gap-5 justify-center items-center "
    //         action={formAction}
    //       >
    //         <Input
    //           type="number"
    //           placeholder="Phone Number"
    //           name="phoneNumber"
    //         />
    //         {state?.errors?.requestFor && (
    //           <p className="text-sm text-red-700" aria-live="polite">
    //             {state.errors.requestFor}
    //           </p>
    //         )}
    //         <SubmitButton />
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}
