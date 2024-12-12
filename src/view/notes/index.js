import React, {useState, useEffect} from 'react';
import {index, store, update, destroy, change} from '../../store/actions/notes.action';
import {changeScreenC} from '../../store/actions/navigation.action';
import {useTheme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {AppBar, Toolbar, IconButton, Typography, CircularProgress, TextField} from '@material-ui/core';
import {MdKeyboardBackspace, MdClose, MdSave, MdSend} from 'react-icons/md'; 
import {FcOpenedFolder} from 'react-icons/fc';


export default function Notes(props){
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notesReducer.notes);
    const note = useSelector(state => state.notesReducer);
    const theme = useTheme();

    const [isLoading, setLoading] = useState(true);
    const [isLoadMore, setLoadMore] = useState(false);
    const [query, setQuery] = useState({
        uid: (props.uid) ? props.uid : null,
        type: (props.type) ? props.type : null,
        page: 1
    })

    const [state, setState] = useState({
        isLoading: false,
        isDeleted: null,
        idEdited: null,
        menuEl: null,
        confirmEl: null
    })

    const _index = (loadMore) => {
        dispatch(index(query, loadMore)).then(res => {
            setLoading(false);
            setLoadMore(false);
        });
    }

    useEffect(() => {
        _index(isLoadMore)
    }, [query]);

    const _store = () => {
        setState({isLoading: true});
        let data = {
            uid: query.uid,
            type: query.type
        };

        dispatch(store({...data, ...note})).then(res => {
            if(res){
                dispatch(change('clear'));
                setState({isLoading: false});
                document.getElementById('scroll').scroll({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        })
    }

    const _update = () => {
        setState({isLoading: true});
        dispatch(update(note)).then(res => {
            if(res){
                dispatch(change('clear'));
                setState({isLoading: false, isEdited: null});
            }
        })
    }

    return(
        <>
            <AppBar position='absolute'>
                <Toolbar>
                    <IconButton onClick={() => dispatch(changeScreenC({open: false}))} 
                                edge='start'
                                color='inherit'>
                                    <MdKeyboardBackspace/>
                    </IconButton>
                     <Typography variant='h6' color='inherit'>Notas</Typography>
                </Toolbar>
            </AppBar>

            <div id='scroll' className='scroll-form notes'>
                {(isLoading) ? <div className='d-flex justify-content-center mt-5 pt-5'>
                    <CircularProgress/>
                </div>
                :
                <>
                    {(notes.data.length > 0) &&
                        <div className='card-body'>
                            <h6 className='m-0'>
                                {notes.total} {(notes.total > 1) ? 'Notas encontradas': 'nota encontrada'}
                            </h6>
                        </div>
                    }

                    {(notes.data.length < 1) &&
                        <div className='text-center mt-5 mb-5 pt-5 pb-5'>
                            <FcOpenedFolder size='70'/>
                            <h6 className='mt-4 text-muted'>Nenhuma nota encontrada</h6>
                        </div>
                    }
                    <div className='form'>
                    <TextField 
                            autoFocus
                            multiline
                            placeholder="Digite uma nota"
                            defaultValue={note.content || ''}
                            onChange={text => dispatch(change({ content: text.target.value }))}
                        />
                        <div className='send'>
                            {(state.isLoading) ? <CircularProgress/> :
                                <>
                                    {(state.isEdited) ? 
                                    <>
                                        <IconButton onClick={() => {
                                            dispatch(change('clear'))
                                            setState({isEdited: null})
                                        }} >
                                            <MdClose/>
                                        </IconButton>
                                        <IconButton onClick={() => note.content && _update()}>
                                            <MdSave color={(note.content) && theme.palette.secondary.main}/>
                                        </IconButton>
                                    </>
                                    :
                                        <IconButton onClick={() => note.content && _store()}>
                                            <MdSend color={(note.content) && theme.palette.secondary.main} />
                                        </IconButton>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </>
                }
            </div>

        </>
    )
}