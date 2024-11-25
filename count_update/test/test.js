// localStorage.setItem('product_data', JSON.stringify({ employee_id: "横山孝大", product_no: "2100225677206", time_stamp: '2024/10/29 15:45:50' }));
const storedData = JSON.parse(localStorage.getItem('product_data'));


const table = document.createElement('table');
// table.classList.add = time_edit;

const table_row = document.createElement('tr');

const table_head = document.createElement('th');

/*------------------------

<table>
    <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
    </tr>
------------- この辺りをforeachでつくる予定 -------------------   
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <selsect>
                <option></option>
            </select>
        </td>
    </tr>
    
------------- この辺りをforeachでつくる予定 -------------------   

</table>


--------------------*/

const table_data = document.createElement('td');

const select = document.createElement('select');

const option = document.createElement('option');



// table.appendChild(thead);

const result = [];
