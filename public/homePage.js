'use strict'
//Выход из личного кабинета
const logOutButton = new LogoutButton();

logOutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
        //console.log(response);
    });
};

//Получение информации о пользователе
ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
    //console.log(current);
});

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function exchangeRate() {
    ApiConnector.getStocks(response => {
        if (response) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

setInterval(exchangeRate, 60000);

//********************************ОПЕРАЦИИ С ДЕНЬГАМИ**************************
const moneyManager = new MoneyManager();

//Пополнение баланса
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Счёт пополнен.");
        } else {
            moneyManager.setMessage(!response.success, response.data);
        }
        //console.log(response);
    });
};
//Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация выполнена.");
        } else {
            moneyManager.setMessage(!response.success, response.data);
        }
        //console.log(response);
    });
};
//Перевод валюты
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Трансфер выполнен.");
        } else {
            moneyManager.setMessage(!response.success, response.data);
        }
        //console.log(response);
    });
};

//***************************Работа с избранным*********************************
const favoritesWidget = new FavoritesWidget();

//Начальный список избранного
ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        //console.log(response);
    }
});
//Добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь добавлен в адресную книгу."
            );
        } else {
            favoritesWidget.setMessage(!response.success, response.data);
        }
        //console.log(response);
        //console.log(data);
    });
};
//Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, "Пользователь удалён из адресной книги.");
        } else {
            favoritesWidget.setMessage(!response.success, response.data);
        }
        //console.log(response);
        //console.log(data);
    });
};