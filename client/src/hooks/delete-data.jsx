import axios from "axios";

export async function DeleteAppointment(url){
  try{
    await axios.delete(url);
  }catch(err){
    console.log(err)
  }
}