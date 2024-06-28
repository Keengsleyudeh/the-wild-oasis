import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow"


function CreateCabinForm() {

  const {register, handleSubmit, reset, getValues, formState} = useForm();
  
  const {errors} = formState;
  console.log(errors)

  const queryClient = useQueryClient();

  const {mutate, isLoading: isCreating} = useMutation({

    mutationFn: createCabin,
    onSuccess: ()=> {
      toast.success("New cabin successfully created")
      queryClient.invalidateQueries({queryKey: ["cabins"]})
      reset()
    },
    onError: (err) => toast.error(err.message)
  });



  function onSubmit(dataa) {
    const data = {...dataa, image: dataa.image[0]}
    // await mutate({...data, image: data.image[0]});
    console.log(data)
    mutate(data)

  };

  function onError(error) {
    // console.log(error)
  }
  
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" disabled={isCreating} {...register("name", {
          required: "This field is required"
        })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" disabled={isCreating} {...register("regularPrice", {
          required: "This field is required",
          min: {
            value: 10,
            message: "Price should be at least $10"
          }
        })} />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" disabled={isCreating} {...register("discount", {
          required: "This field is required",
          validate: (value => value < getValues().regularPrice || `Discount must be less than ${getValues().regularPrice}`)
        })} defaultValue={0} />
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" disabled={isCreating} {...register("description", {
          required: "This field is required"
        })}defaultValue="" />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" 
        // accept="image/*" 
        disabled={isCreating} {...register("image", {required: "This field is required"})}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
