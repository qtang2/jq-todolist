$(function() {
    load()

    //Press 'enter' to add item to todolist
    $('#title').on('keydown', function(e) {

        if (e.keyCode == 13) {
            if ($(this).val() == "") {
                alert('To do cannot be empty :)')
            } else {
                //get data from local storage
                let data = getData()
                let newData = { title: $(this).val(), done: false }
                data.push(newData)

                //save data to local storage
                saveData(data)

                //display data on page 
                load()

                $(this).val("")
            }
        }

    })

    //Press delete button to delete item(use bind father trigger by son)
    $("#todolist, #donelist").on("click", "a", function() {
        let data = getData()
        let idx = $(this).attr('id')
        data.splice(idx, 1)
        saveData(data)
        load()
    })

    //Click check box to change the position of each list item
    //union collection need to add ',' in between
    $("#todolist,#donelist").on("click", "input", function() {
        // console.log('inputclicked');
        let data = getData()

        //get index from input's sibling a
        let idx = $(this).siblings('a').attr('id')
        data[idx].done = $(this).prop('checked')
        saveData(data)
        load()
    })


    function load() {
        let data = getData()
            //before traverse, need to clear content of ol
        $('ul,ol').empty()
        let todocount = 0
        let donecount = 0
        $.each(data, function(i, ele) {
            // console.log(ele);
            if (ele.done) {
                donecount++
                $('section ul').prepend("<li><input type='checkbox' checked='true'><p>" + ele.title + "</p><a href='javascript:;' id='" + i + "'>-</a></li>")
            } else {
                todocount++
                $('section ol').prepend("<li><input type='checkbox'><p>" + ele.title + "</p><a href='javascript:;' id='" + i + "'>-</a></li>")
            }

        })
        $('#todocount').text(todocount)
        $('#donecount').text(donecount)

    }

    function saveData(data) {
        localStorage.setItem('todolist', JSON.stringify(data))
    }

    //return data get from local storage as in json object format
    function getData() {
        let data = localStorage.getItem('todolist')
        if (data !== null) {
            return JSON.parse(data)
        } else {
            return []
        }
    }
})