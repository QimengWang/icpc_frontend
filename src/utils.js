// import axios from 'axios';
import instance from './api/interceptors';


export function exportMethod(data) {
  instance.get('/user/manager/showExecl', {
      params: {cid: data.params.cid},
      responseType: 'blob'
    }).then(res => {
    // console.log(res.data);
    let d = res.data;
    const link = document.createElement('a');
    let blob = new Blob([d], {type: 'application/x-excel'});
    // let blob = new Blob([res.data], {type: 'application/x-excel'});
    link.style.display = 'none';
    link.href = URL.createObjectURL(blob);
    link.download = data.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch(err => {
    console.log(err);
  });
}
