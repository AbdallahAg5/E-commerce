import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startExam } from "../redux/questionReducer";
import data from "../data/data";

export const useFetch = () => {
  const dispatch = useDispatch();
  const [getData, setgetData] = useState({
    isLoading: false,
    apiData: [],
    err: null,
  });

  useEffect(() => {
    setgetData((prev) => ({ ...prev, isLoading: true }));
    const Fetch = async () => {
      try {
        let question = await data;
        if (question.length >  0) {
          setgetData((prev) => ({
            ...prev,
            isLoading: false,
            apiData: question,
          }));
          dispatch(startExam(question))
        } else {
          throw new Error("No Question Here");
        }
      } catch (error) {
          setgetData(prev => ({...prev,err:error}))
      }
    };

    Fetch();
  }, [dispatch]);

  return [getData, setgetData];
};

/*
 
       useEffect(async () => {
      setData({...data,isLoading:true})
    await fetch(url)
          .then(res => res.json)
          .then( res  => {  setData({...data,data:res.data} , dispatch(startExam(res.data))  )})
          .catch( err => setData({...data,err:err}))
          .then(() => setData({...data,isLoading:false}))
      }, [url]);

 */
