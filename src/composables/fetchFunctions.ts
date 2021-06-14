export const getData = async (url: string) => {
  try {
    //fetch() returns promise
    const result = await fetch(url);
    //result men status ej ok
    if (!result.ok) {
      // console.log("result:", result);
      throw Error("Fetch data error: " + result.statusText);
    }
    //result.json(); returns promise
    const data = await result.json();
    return data;
    //inget result ex hittar ej url
  } catch (err) {
    console.log("error:", err);
  }
};
