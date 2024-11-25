// データ行を生成する
function createDataRow(no, worker, productNo, saveTime) {
    const row = document.createElement("tr");

    // No.
    const tdNo = document.createElement("td");
    tdNo.textContent = no;
    row.appendChild(tdNo);

    // 作業者
    const tdWorker = document.createElement("td");
    tdWorker.textContent = worker;
    row.appendChild(tdWorker);

    // 商品番号
    const tdProductNo = document.createElement("td");
    tdProductNo.textContent = productNo;
    row.appendChild(tdProductNo);

    // 保存時間
    const tdSaveTime = document.createElement("td");
    tdSaveTime.textContent = saveTime;
    row.appendChild(tdSaveTime);

    // 修正時間
    const tdEditTime = document.createElement("td");
    const select = document.createElement("select");
    const option = document.createElement("option");
    // 時間の選択肢
    for (let hour = 9; hour <= 18; hour++) {
        const option = document.createElement("option");
        option.value = hour;
        option.textContent = hour;
        select.appendChild(option);
    }


    tdEditTime.append(select);
    row.appendChild(option);

    return row;
}