import  { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
const FactureList = () => {
    const [factures, setFactures] = useState([]);

    useEffect(() => {
        const fetchFactures = async () => {
            try {
                const response = await fetch('http://localhost:5000/factures');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFactures(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchFactures();
    }, []);

    const handleExport = (facture) => {
        
        const doc = new jsPDF();
        const logo = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AyAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQYEBQcDAgj/xABKEAABAwMCAgUIBQcICwAAAAABAAIDBAURBiESMRMXQVHTBxQiVGFxgZMVMpGh0hYjQkSCsdE1Q2KEkqTB4SQ3UlVjc5Sio7PC/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EACkRAQADAAEDBAECBwAAAAAAAAABAhEDEhNRBCExQWEUQgUiI1JxkaH/2gAMAwEAAhEDEQA/AO4oiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIvnKZQfSKOJRxIPpFGVHEg+kUZCZ9yCUUboglFGUyglFGUyglFGUyglFGUyglFGUyglFGfemfeglFGUyglFGUQfjgoUKFd2QzQowe4rZ2C1i61ronPLIo2dJIW8+HIG3tyQrBJYtORyFj6t7XNJDgauMEEdn1VpHFsa5+T1VOO3TPypfw+5M+wq5fQumfXf75H/AAXm60adHKq/vkf8FPYVj1dZ+p/0qGR3H7E37lbH2WztjEgkdwHYO87Zg/HC8Pom0uIbE/jcTjArY8/ZhR2mkc8SrBULOutEyklj6EudFK3ibxcxvgg4CxqSnfV1kNLEQHzSCNme8nG6pNYhrE68SoKu2o/JlftPWee6V76J1PCW8XRSuc70nBo24faqSVWOmfhOBULOs9rqr1dKW20DeKoqZAxmeQ7yfYACVadQeS/UNhtE90qzSS08ABkEErnOAJxnHDyHNJmsTgo6hZVtopbjcaWhg4RLUzMhYXHbic7hG/dlX7qV1V2SW32fn3cv7CTNY+TJc3RXq6eSXVlvpn1ApoKprAXFtNNxOx7jgn4ZVFILSQQQRnIIxySs1t8D5UZX00cRAHPZb2s0lcKOlkqJXwlrBkhrjnn7leKTO5Hwzvy0pMRac1X1BVn/ACJueM8dOP2j/BDoi543kp/7R/gr/p7/ANrD9d6f464VcoVl3OglttW+mnLS9nPhORyzzWIVn0xuOqJ6oiYQfiiFFGQlsys+32avucb5KKFsjWnBzI1v7ysAr1hqZ6YEU88sWefA8jKtH5Vtuey1adtN1tFTNJLRMkZJF0fo1UQweJp7Xf0Vr7hpy8VVbUVLaWJolldJvUxHGTnvWZousqqitrG1FTNKBTZAe8nfjbvv71qLxca1l2rWsrKhrRUPAAldgAOPtWs50Q4qzfv2j7yHrJpa4R0ks8rqdjo2Of0XShznNaMkjG33rRLP+mLj5rJTGsldDJ9ZrnZ27sndYCyl2Uif3LJ+VIjt8FMKRpexjYzxPPCcDGQvim1BPPVQwx08LXyPDWu6R2xyN+ay4rfpj6JppZqxkcz2tLnsnJkc7HpNLQDgA8jjf7M+cNNpuGoiliucznse1wbh++OX82rRrGbU3MlF2rai2CKN7IHtlGR0Ukgxv7cLFtt0fW3q1xviY3FbC4OLi4jDsYGTsN1m3cWqfohWVb4nsDsYD2ZB9hjWHbobdHerUaGoc+Tz2LIOccPEN8ljcKOX7acU7X3d38sv+rm6++H/ANrF+ZSv1fryx1GpNK1tqpZI4pZ+DhfLnhHC9rjnHuXF715H7zabVU3CWvoZWU0ZkdHHxlzsdg9HtXLxWiI928w2vkAsHTV9bfp2ehTjzeAnte7dxHuaQP2l1qGutupYbvbGnpYoJXUdS3vJaCf3ke8LA0pQUujNFUlPXTR07YIukqZHkAB7jl2T7CcfBeenbtoyK4zQ2GtoBWV0hfIyKT0pXbknft3KztOzqYhwG1WyazeUm3WyoGJaa7wx5x9YCQYPuIwfiv0fq2O/S2d40xNBDceNvC+YDh4e3sK575TbB5v5QtL36Bp4Kqvp4JyB+m17eEn3jI/ZXQdXw36WyvZpeoip7jxt4Xy8OOHt5ghTe3ViIRpx15orD0mrKilfWR8TpJYBhoZ2dnP3LgFHpmp8oGqr5LYH01PB5w6oaKkuYC1zzw8mnfb713fRMGp4LfMzV9VS1VQ5/wCaMDQMNxyOAB9y4tq3UNVo/wAod9Ok6iGmZM5gla2JrhxcIc4DIP6Rcp492YglqtV+T67aOgpqu51FDLHNMIgKeRziDgnfLRtsrFqY4sFYcbhufvCqN91tftTx09Leqxs8McoewCFjcOxjsAVu1N/INaOeGf4hep6TYpbXifxSP6/D/lpNN6lrblc2U07YQwgklrTnYE962GrLxU2iGB9KGEyOIPGM8sfxVU0T/L0Z/ou/ct15RcebUe+cvd2+wLWvJbs2nWHL6fij19KRWMlT7nXS3KrfUzhokfjPCMDYYWIVJKgrg+d19BWIr7QgohRBsyhQoUFi0NIxl0njc4B0lOWt35niacfYCsi46UqqmuqahlXSBksrntDi8Hc5H6KrFMOKoib0oiBeAJP9nfcroP0PKOV0u/uFTt9mFvx/zVzHn+pm3DyddZ+fwrDtKVTedZSfa/8ACvN2mahvOspPtf8AhVqdZ5f953f/AKn/ACWNJbJ2/r94Puqf8lPajwpT1cz+7/ismwTN51tLnvzJ+FKW1+bVUE76ymc2KRrnBvGSQDkj6i3ktDUs/Wbw7+sn8KxpIKsZ9O8u99QT/wDKiaRDspebNPc2SPbTRsY98jWl54G5IB5A43Hfv7O9YlMyspaqKohgkEsTw9hMZIBBz3Ld6froLbX13nNwnjDnBrZoZ5W9Lwu5ngOcYzv7Ns7Y2v5T0RjAbeLt0oa0ZdVziPi23I4s4237SCeR2HPadmW/0+z5UNcj+fA/qbd/+1fMvlM1tPGWyyNex36JomnON+5fB1LTh1IXXi5dHkdOIqypy4dHvzO3p93f7F6DVFv4yPpW8cDQ30n1U5e7cnkHgbDGdx3e1ZdMeE61991xq2/2yS23KVzqZ5BexlMG5xy5DvGfgq7bn3G219PW0cczKinkEkTuAnBBznlure/U9ua3jjvF8dIC383LVylhGAHbhwPfjbmdwvQagowYJZL1dGxvmJLPO6jLow7G+/fk7c2t7wQpjIgYVw8oOsLnFC2tc2QQzR1EeaRvovY7LXDb2LL60td8OfOAOXKjb+Fa63ajy+oFzvd7ZggwugqpC0D0geZ5YLD37e3bYflNQMaXi53t+ZzxGSqmw2JzXY5O2cHADtBye5Mr4NY9b5Sdc1cLoX10sLXZDjDStY49n1g3I+Cpz6eqfI58kUznuJc5zmE5O5JJ9v8Airw/Utt4cuvV84+L0mxVc3ARxA5aXHI2BG4O57uXlValgBxSXq5OYJ2EE1VQJDECeLI4i3OcfDHM5UxkfEEqUKapZICKeXIOfqLb1d7vlXTPpZmPLHjDh0Px7lZZNUWsVQbT3a9eb7OJkrKgvxjkMO3IONyAME9uAPJ+p7dxF0V5vpIBIjNTLwOdzGwfkDbBGSRkbnmrRyWj4lS3FS8xNo3FPt8lwttU2ppopWyNHMx962b/AKW1HllY+OCCmaZZKiZvRsibkDJwCdyQAACcnkt+3UtC6IySXy6RnA/Ntraji4sZcMF31eQHdh2eYWhn1TWeeVsE88lztVQSw0tRUSuYW5BBaSeIOBaMH7cqeu2ZEonjpNotnv5ai72uW2SRB0kU8M7OkgqIHcUcrckZGQCMEEEEcwsArY3i5uuLoGsp46ampoujhhY4nhBJJJJJJJJJJytcVMfldBRCiDZlCul9SupPXbV86Tw1HUrqT160/Nl8NU7lfKclzTsx2Ywo92y6X1Kal9dtPzZfDTqT1L69aPmy+GndrH2jp8w5oSSvkZHaV03qS1L69aPmy+Go6ktTevWj5svhqe7Hk6HM8KPcum9SWpvXrR82Xw06ktTevWj5svhp3a+U9LmJWfZrobXUSzebxTccJi4Jd274zt8FfupHU3r1o+bL4ajqQ1L21to+bL4arN6+TJVuTWjnytdJQRvYM/m5JCQDhuCAMAEFoA9me/KxoNTMpGcFHQdHgDLjKeM4j6MAkAAjG5GOe6tnUjqX120/Ol/AnUhqY/r1o+bJ4addTFXm1e5/Qk26DMb2vDicnIe15aCNw3bGO4gdi9ZdZ9LHK2WhdiRvCWMnwGDBHo+hnkcb57e9WI+Q/Up/XbR82Xw1HUfqf160fNl8NOuopV4vwuZjcKGGB7XcTuD6rjknYe9zvuWY3VsjaWGnZSNPRMaBxyZBLWFoJGM4aSCB7N8q1dR+p9/9OtG//Gl8NR1Han9etPzpfwJ108mK07WH+nOq2W89M5zS5r5iQcOLgNgDjLz29jO7f5OtJpG4moaeTYehn0D6JaeJvbu44xgKzdRups58+tHzZPDTqO1P69aPZ+dl2/8AGnXUVir1nNPDJHHRxxF0Zbxh/psBj4SGkD6uwOO8L6g1pJFTxwmgY0MDfShk4HPLe1xIOTnLh7ce5WXqN1P6/afnS+GvnqN1R69Z/nSeGnXUc0q5vOKqafoxGJHucGDk3Jz9i8T9vvXUeozU/Pz+zZ/50vhp1Gan9fs/zpfDUxyVMly0hCuo9Rep/X7P86Xw06i9Uev2b50vhp3K+TJctKLqPUVqj1+zfOl8NE7lfJj9EpgKUXFi6MJhSiYIRSiYIRSiYIRSiYIwmFKJgjCYUomCMJhSiYIwmFKJgjCYUomCMBMBSiYIwEUomCMIpRMBERSCIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIg//2Q==';
        doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Positionnez et redimensionnez l'image selon vos besoins
      
        doc.setFillColor(0, 102, 204); // Couleur de fond (bleu)
        doc.rect(0, 30, 210, 20, 'F'); // Rectangle coloré
        doc.setTextColor(255, 255, 255); // Couleur du texte (blanc)
        doc.setFontSize(20);
        doc.text('Facture', 105, 42, null, null, 'center'); // Centré au milieu du rectangle
      
        // Reset couleur du texte
        doc.setTextColor(33, 0, 0);
      
        // Détails du client et de la facture
        doc.setFontSize(12);
      
       
        doc.text(`Nom du client: ${facture.clientName}`, 70, 60);
        doc.text(`Email du client: ${facture.clientEmail}`, 70, 90);
        doc.text(`Date: ${facture.date}`, 70,70);
        doc.text(`Montant total: ${facture.totalAmount.toFixed(2)} DT`, 70, 80);
   // Add table with product details
   const tableColumn = ["Produit", "Quantité", "Prix Unitaire", "Total"];
   const tableRows = facture.items.map(item => [
       item.productName,
       item.quantity,
       item.unitPrice.toFixed(2),
       (item.quantity * item.unitPrice).toFixed(2),
   ]);

   doc.autoTable({
       head: [tableColumn],
       body: tableRows ,
       startY: 100,
       theme: 'striped',
       headStyles: { fillColor: [0, 123, 255] },
       alternateRowStyles: { fillColor: [240, 240, 240] },
   });

        doc.save(`facture_${facture.id}.pdf`);
    };

    return (
        <div>
            <h2>Liste des factures générées</h2>
            <ul>
                {factures.map((facture) => (
                    <li key={facture.id}>
                        <p>Nom du client: {facture.clientName}</p>
                        
                        <p>Email du client:{facture.clientEmail}</p>
                        <p>Date: {facture.date}</p>
                        <p>Montant total: {facture.totalAmount.toFixed(2)} Dt</p>
                        <button onClick={() => handleExport(facture)}>Exporter</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FactureList;
