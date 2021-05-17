import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import { ListWrapper, Update, Delete} from './movies.styles';

class UpdateMovie extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/movies/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteMovie extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the movie ${this.props.id} permanently?`,
            )
        ) {
            api.deleteMovieById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class MoviesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllMovies().then(movies => {
            this.setState({
                movies: movies.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { movies, isLoading } = this.state
        console.log('TCL: MoviesList -> render -> movies', movies)

        // const columns = [
        //     {
        //         Header: 'ID',
        //         accessor: '_id',
        //         filterable: true,
        //     },
        //     {
        //         Header: 'Name',
        //         accessor: 'name',
        //         filterable: true,
        //     },
        //     {
        //         Header: 'Rating',
        //         accessor: 'rating',
        //         filterable: true,
        //     },
        //     {
        //         Header: 'Time',
        //         accessor: 'time',
        //         Cell: props => <span>{props.value.join(' / ')}</span>,
        //     },
        //     {
        //         Header: '',
        //         accessor: '',
        //         Cell: function(props) {
        //             return (
        //                 <span>
        //                     <DeleteMovie id={props.original._id} />
        //                 </span>
        //             )
        //         },
        //     },
        //     {
        //         Header: '',
        //         accessor: '',
        //         Cell: function(props) {
        //             return (
        //                 <span>
        //                     <UpdateMovie id={props.original._id} />
        //                 </span>
        //             )
        //         },
        //     },
        // ]

        // let showTable = true
        // if (!movies.length) {
        //     showTable = false
        // }

        return (
            <ListWrapper>
                {
                    movies.map(({_id, name, time, rating}) => (
                        <div className='mapList' key={_id}><h1>{name}</h1>
                        <p>{time}</p>
                        <p>{rating}</p>
                        <span>
                            <UpdateMovie id={_id} />
                        </span>
                        <span>
                            <DeleteMovie id={_id} />
                        </span>
                        </div>
                    ))
                }
            </ListWrapper>
        )
    }
}

export default MoviesList