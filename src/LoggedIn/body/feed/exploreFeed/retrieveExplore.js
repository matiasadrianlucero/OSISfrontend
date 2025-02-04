import axios from 'axios'
import { useEffect, useState } from 'react'
import getAdress from '../../../../getAdress'
export default async function retrieveExplore() {
  
  let adress=getAdress()
  let url = adress + '/retrieve/Explore' 

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': localStorage.getItem("token"),
      },
    });
    if (response && response.data) {
      return response.data
    } else {  console.log('No data found');
      return null;
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}