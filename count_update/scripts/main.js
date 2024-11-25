// テストデータを保存
localStorage.setItem('product_data', JSON.stringify({ employee_id: "横山孝大", product_no: "2100225677206", time_stamp: '2024/10/29 15:45:50' }));

function main() {
    // searchUpdateBtnを繰り返す interval_id にタイマーIDを格納する
    let interval_id = setInterval(searchUpdateBtn, 100);
    let update_btn = null;

    function searchUpdateBtn() {
        // ページ全体から 更　新と書かれた aタグを探し、結果のリストを返す
        try {
            const anchor_element = document.evaluate(
                "/html/body//a[text()=' 更　新 ']",
                document,
            );

            // 更　新 ボタンがみつかったとき
            // evaluate() で見つかったリストの要素を取り出す
            if (anchor_element) {
                update_btn = anchor_element.iterateNext();
                clearInterval(interval_id);
                update_btn.addEventListener('click', () => {

                    // 作業者名を取得 "株式会社SASAGE","/","様" の文字列を削除する
                    let employee_id = document.querySelector('a.name').textContent.replace(/株式会社SASAGE|\/|様/g, '').trim();

                    // 製品番号を取得
                    let product_no = document.querySelector('#product_code').value;

                    // 保存した時間を取得
                    let time_stamp = new Date().toLocaleString();

                    //取得したデータをローカルストレージに保存する
                    saveProduct(employee_id, product_no, time_stamp);
                });

            }
        } catch (e) {
            console.log("searchUpdateBtn()でエラーが発生しました", e);
        }
        console.log("setIntervalを終了します。");
    }
}

main();