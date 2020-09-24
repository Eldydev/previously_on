import React, { Component } from "react";
import history from "../utils/history";
import '../App.css';
import add from '../Images/add.png';
import Popup from "reactjs-popup";

class MemberSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MemberSeriesArray: [],
            serieid: '',
            archivedStatus: '',
            serieInfo: [],
            serieList: [],
            seriesearch: '',
            message: '',
            seriename: '',
            token: '',
            opendetails: false,
            openserieList: false,
            opennewseriemaping: false,
            openvalidaddserie: false
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.seriedetails = this.seriedetails.bind(this);
        this.archiveserie = this.archiveserie.bind(this);
        this.test = this.test.bind(this);
        this.closeDetailsModal = this.closeDetailsModal.bind(this);
        this.closeSerieListModal = this.closeSerieListModal.bind(this);
        this.closenewseriemapingModal = this.closenewseriemapingModal.bind(this);
        this.closevalidaddserieModal = this.closevalidaddserieModal.bind(this);

    }
    closeDetailsModal() {
        this.setState({ opendetails: false });
    }
    closeSerieListModal() {
        this.setState({ openserieList: false });
    }
    closenewseriemapingModal() {
        this.setState({ opennewseriemaping: false });
    }
    closevalidaddserieModal() {
        this.setState({ openvalidaddserie: false });
    }
    componentDidMount() {
        const cachedToken = localStorage.getItem('user_token')
        if (cachedToken) {
            var token = cachedToken.replace(/['"]+/g, '')
            this.setState({ token: token });
        }

        fetch('https://api.betaseries.com/shows/member?client_id=195bb87bcdc5&token=' + token)
            .then(res => res.json())

            .catch(error => console.error('Error: ', error))

            .then(response => {
                console.log('Success: ', response.shows)
                let MemberSeriesArray = response.shows;
                this.setState({ MemberSeriesArray: MemberSeriesArray })
            });
    }

    serielist = e => {

        return (
            <div>
                <h3>cherchez une serie</h3>
                <input
                    type='text'
                    name="seriesearch"
                    value={this.state.seriesearch}
                    onChange={this.handle_change}
                ></input>
                <div>
                    <button onClick={e => this.test(e)}
                        className="archive styled"
                        type="button">Search
                    </button>
                </div>
                <div></div>
            </div>
        )

    }
    serielistshow(e) {
        this.setState({ openserieList: true })
    }
    test(e) {
        this.setState({ openserieList: false })
        const name = this.state.seriesearch
        fetch('https://api.betaseries.com/shows/list?client_id=195bb87bcdc5&summary=true&filter=new&starting=' + name)
            .then(res => res.json())

            .catch(error => console.error('Error: ', error))

            .then(response => {
                console.log('Success1: ', response.shows)
                let serieList = response.shows;
                this.setState({ serieList: serieList })
                this.setState({ opennewseriemaping: true })
            });
    }

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    seriedetails(e, id, archived) {
        var serieid = id.toString()
        this.setState({ serieid: serieid })
        this.setState({ archivedStatus: archived })

        fetch('https://api.betaseries.com/shows/display?client_id=195bb87bcdc5&id=' + serieid)
            .then(res => res.json())

            .catch(error => console.error('Error: ', error))

            .then(response => {
                console.log('Success: ', response)
                let serieInfo = response.show;
                this.setState({ serieInfo: serieInfo })
                this.setState({ opendetails: true })
            })
    }
    seriemapping() {
        if (this.state.serieInfo.length !== 0) {
            const m = this.state.serieInfo
            if (this.state.archivedStatus === false) {
                return (
                    <div className=''>
                        <div className="">
                            <div className="" >
                                <img width="85%" height="85%" src={m.images.banner}></img>
                                <h2>{m.title}</h2>
                                <div>
                                    {Object.keys(m.genres).map(function (i) {
                                        return <div key={i}>{m.genres[i]}</div>;
                                    })}
                                </div>
                                <ul>
                                    <li> saisons : {m.seasons} - {m.episodes} épisodes ({m.length} min)</li>
                                    <li>{m.notes.mean} / 5</li>
                                    <h3>résumé</h3>
                                    <p>{m.description}</p>
                                </ul>
                                <div>
                                    <button onClick={e => this.archiveserie(e)} className="archive styled"
                                        type="button">
                                        Archive serie
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className=''>
                        <div className="">
                            <div className="" >
                                <img width="85%" height="85%"></img>
                                <h2>{m.title}</h2>
                                <div>
                                    {Object.keys(m.genres).map(function (i) {
                                        return <div key={i}>{m.genres[i]}</div>;
                                    })}
                                </div>
                                <ul>
                                    <li> saisons : {m.seasons} - {m.episodes} épisodes ({m.length} min)</li>
                                    <li>{m.notes.mean} / 5</li>
                                    <h3>résumé</h3>
                                    <p>{m.description}</p>
                                </ul>
                                <div>
                                    <button onClick={e => this.unarchiveserie(e)} className="archive styled"
                                        type="button">
                                        Unarchive serie
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
    newseriemapping() {

        console.log(this.state.serieList)
        if (this.state.serieList.length !== 0) {
            const m = this.state.serieList
            return (
                <div className=''>
                    <div className="">
                        <div className="" >
                            {m.map((serie, i) => {
                                return (
                                    <div className='' key={i}>
                                        <p onClick={e => this.validaddserie(e, serie.id, serie.title)}>{serie.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )

        }

    }
    validaddserie(e, id, title) {
        if (id != undefined) {
            var serieid = id.toString()
            this.setState({ serieid: serieid })
            this.setState({ seriename: title })
            this.setState({ openvalidaddserie: true })
        }

        console.log('addserie')
        return (
            <div>
                <h3>ajouter {this.state.seriename} à vos serie ?</h3>
                <div>
                    <button onClick={e => this.addserie(e, serieid)}
                        className="archive styled"
                        type="button">
                        Oui
                    </button>
                </div>
                <div>
                    <button onClick={this.closevalidaddserieModal} className="archive styled"
                        type="button">
                        Non
                    </button>
                </div>
            </div>
        )
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    addserie(e, id) {
        fetch('https://api.betaseries.com/shows/show', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: '195bb87bcdc5',
                token: '3a16a608e155',
                id: this.state.serieid
            })
        })
            .then(res => res.json())

            .catch(error => console.error('Error: ', error))

            .then(response => {
                console.log('Success: ', response)
            })
        setTimeout(() => window.location.reload(), 500);

    }
    archiveserie(e) {

        fetch('https://api.betaseries.com/shows/archive', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.serieid,
                client_id: '195bb87bcdc5',
                token: '3a16a608e155'

            })
        })
            .then(res => res.json())

            .catch(error => console.error('Error: ', error))

            .then(response => {
                console.log('Success: ', response)
            });
        setTimeout(() => window.location.reload(), 500);
    }

    unarchiveserie(e) {
        var serieid = this.state.serieid

        fetch('https://api.betaseries.com/shows/archive?client_id=195bb87bcdc5&token=3a16a608e155&id=' + serieid, {
            method: 'delete'
        })
            .then(res => res.json())

            .catch(error => console.error('Error: ', error))

            .then(response => {
                console.log('Success: ', response)
            });
        setTimeout(() => window.location.reload(), 500);
    }
    render() {
        if (!this.state.MemberSeriesArray) {
            return (
                <div>error</div>
            )
        }
        if (this.state.MemberSeriesArray.length !== 0) {
            return (
                <div>
                    <div>
                        <h2>Ajouter une serie</h2>
                    </div>
                    <div className='seriebox'>
                        <div className="serieinfo">
                            <div className="block_img" >
                                <img onClick={e => this.serielistshow(e)} width="85%" height="85%" src={add}></img>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Mes series</h2>
                    </div>
                    <div>
                        {this.state.MemberSeriesArray.map((serie, i) => {
                            if (serie.user.archived === false) {
                                return (
                                    <div className='seriebox' key={i}>
                                        <div className="serieinfo">
                                            <div className="block_img" >
                                                <img onClick={e => this.seriedetails(e, serie.id, serie.user.archived)} width="85%" height="85%" src={serie.images.poster}></img>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div>
                        <h2>Series arichvées</h2>
                    </div>
                    <div>
                        {this.state.MemberSeriesArray.map((serie, i) => {
                            if (serie.user.archived === true) {
                                return (
                                    <div className='seriebox' key={i}>
                                        <div className="serieinfo">
                                            <div className="block_img" >
                                                <img onClick={e => this.seriedetails(e, serie.id, serie.user.archived)} width="85%" height="85%" src={serie.images.poster}></img>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <Popup
                        open={this.state.opendetails}
                        closeOnDocumentClick
                        onClose={this.closeDetailsModal}
                    >
                        <div className="modal">
                            <a className="close" onClick={this.closeDetailsModal}>
                                &times;
                            </a>
                            <div>{this.seriemapping()}</div>
                        </div>
                    </Popup>
                    <Popup
                        open={this.state.openserieList}
                        closeOnDocumentClick
                        onClose={this.closeSerieListModal}
                    >
                        <div className="modal">
                            <a className="close" onClick={this.closeSerieListModal}>
                                &times;
                            </a>
                            <div>{this.serielist()}</div>
                        </div>
                    </Popup>
                    <Popup
                        open={this.state.opennewseriemaping}
                        closeOnDocumentClick
                        onClose={this.closenewseriemapingModal}
                    >
                        <div className="modal">
                            <a className="close" onClick={this.closenewseriemapingModal}>
                                &times;
                            </a>
                            <div>{this.newseriemapping()}</div>
                        </div>
                    </Popup>
                    <Popup
                        open={this.state.openvalidaddserie}
                        closeOnDocumentClick
                        onClose={this.closevalidaddserieModal}
                    >
                        <div className="modal">
                            <a className="close" onClick={this.closevalidaddserieModal}>
                                &times;
                            </a>
                            <div>{this.validaddserie()}</div>
                        </div>
                    </Popup>



                </div>
            )
        }
        else {
            return (
                <div><p>loading ...</p></div>
            )
        }

    }
}
export default MemberSeries