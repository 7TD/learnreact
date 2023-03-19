import styles from "./TestPage.module.scss";
import {Field} from "./Fields/Fields";
import {Person} from "./Person/Person";
import React from "react";
import axios from "axios";
import {IPerson} from "../../models/IPerson";
import {PersonApi} from "../../api/personRequest";


export const TestPage = () => {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isGet, setIsGet] = React.useState(false);
    const [idList, setIdList] = React.useState<number[]>([]);

    const [persons, setPersons] = React.useState<IPerson[]>([]);
    const [dellPerson, setDellPerson] = React.useState<IPerson[]>([]);
    const [addPerson, setAddPerson] = React.useState<IPerson[]>([]);

    const addField = () => {
        setAddPerson(prev => [...prev, {id: 0, firstName: ''}])
    }

    // Запрос данных
    const getPersonsByID = () => {
        setPersons([]);
        setIsGet(true);

        idList.map((id) => {
            axios.get(`https://localhost:7095/api/Person/${id}`).then((res) => {
                setPersons(prev => [...prev, res.data]);
            })
        })
    }

    async function fetchProducts() {
        setPersons([]);
        const response = await new PersonApi().getPersons();
        setPersons(response.data);
    }
    React.useEffect(() => {
        fetchProducts();
    }, []);

    // Удаление
    const delPersons = () => {
        dellPerson.map(person => {
            axios.delete(`https://localhost:7095/api/Person/${person.id}`);
            setPersons(current =>
                current.filter(emploee => {
                    return emploee.id !== person.id;
            }));
        });
        setDellPerson(prev => []);
    }

    // Добавление
    const addedPerson = () => {
        setIsAdded(true);
        fetchProducts();
    }


    return (
        <div className={styles.dd}>
            <div className={styles.bg}>
                <div className={styles.Left}>
                    <button onClick={addedPerson} className={styles.BtnGreen}>Добавить</button>
                    <button className={styles.BtnBlue}>Изменить</button>
                    <button onClick={delPersons} className={styles.BtnRed}>Удалить</button>
                    <button onClick={getPersonsByID} className={styles.BtnGreen}>Получить</button>
                    <button onClick={fetchProducts} className={styles.BtnGreen}>Получить все</button>
                </div>
                <div className={styles.Middle}>


                    {addPerson.map((person, index) => (
                        <Field
                            isGet={isGet}
                            idList={idList}
                            setIdList={setIdList}
                            isAdded={isAdded}
                            setIsAdded={setIsAdded}
                            key={index}
                        />
                    ))}


                    <svg onClick={addField} width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.4465 0C13.3419 0 12.4465 0.895431 12.4465 2V10C12.4465 11.1046 11.551 12 10.4465 12H2C0.895432 12 0 12.8954 0 14V18C0 19.1046 0.89543 20 2 20H10.4465C11.551 20 12.4465 20.8954 12.4465 22V30C12.4465 31.1046 13.3419 32 14.4465 32H18.7441C19.8487 32 20.7441 31.1046 20.7441 30V22C20.7441 20.8954 21.6396 20 22.7441 20H31.1906C32.2952 20 33.1906 19.1046 33.1906 18V14C33.1906 12.8954 32.2952 12 31.1906 12H22.7441C21.6396 12 20.7441 11.1046 20.7441 10V2C20.7441 0.895431 19.8487 0 18.7441 0H14.4465Z" fill="#519865"/>
                    </svg>
                </div>
                    <div className={styles.Right}>
                        {persons.map(person => (
                            <Person
                                setState={setDellPerson}
                                state={dellPerson}
                                person={person}
                                key={person.id}
                            />
                        ))}
                    </div>
            </div>
        </div>
    );
};

