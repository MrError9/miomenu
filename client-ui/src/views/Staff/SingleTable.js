import { Sidenav } from 'materialize-css'
import React from 'react'
const SingleTable = () => {
    return (
        <div className="sfaff-wrapper">
            <aside>
                <div className="aside-img">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII=" />
                </div>
                <ul>
                    <li>tables</li>
                    <li>tables</li>
                    <li>tables</li>
                    <li>tables</li>
                    <li>tables</li>
                    <li>tables</li>
                </ul>
            </aside>
            <main>
                <div className="breadcrumbs">
                    <h3>table 69</h3>
                    <a>Tables </a>
                    >
                    <a> Tables </a>
                    >
                    <a> Tables </a>
                    >
                    <a> Tables</a>
                </div>
                <br />
                <div className="row">
                    <button className="btn mr-8 green capitalize">delivered</button>
                    <button className="btn mr-8 orange capitalize">pending</button>
                    <button className="btn mr-8 grey capitalize">empty</button>
                </div>
                <div className="row">
                    <div className="col s8 pl-0">
                        <div className="col s4 pl-0">
                            <div className="card horizontal">
                                <div className="card-stacked">
                                    <div className="card-content pl-0 pr-0">
                                        <strong className="uppercase green-text">Table Uno</strong>
                                    </div>
                                    <div className="card-action pl-0 pr-0">
                                        <small>items</small>
                                        <small>$12.99</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s4 pl-0">
                            <div className="card horizontal">
                                <div className="card-stacked">
                                    <div className="card-content pl-0 pr-0">
                                        <strong className="uppercase orange-text">Table Uno</strong>
                                    </div>
                                    <div className="card-action pl-0 pr-0">
                                        <small>items</small>
                                        <small>$12.99</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s4 pl-0">
                            <div className="card horizontal">
                                <div className="card-stacked">
                                    <div className="card-content pl-0 pr-0">
                                        <strong className="uppercase green-text">Table Uno</strong>
                                    </div>
                                    <div className="card-action pl-0 pr-0">
                                        <small>items</small>
                                        <small>$12.99</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s4 pl-0">
                            <div className="card horizontal">
                                <div className="card-stacked">
                                    <div className="card-content pl-0 pr-0">
                                        <strong className="uppercase orange-text">Table Uno</strong>
                                    </div>
                                    <div className="card-action pl-0 pr-0">
                                        <small>items</small>
                                        <small>$12.99</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s4 pr-0">
                        <div className="col s12 check-wrapper">
                            <div>
                                <small className="uppercase">subtotal</small>
                                <small className="uppercase">$69</small>
                            </div>
                            <hr />
                            <div>
                                <small className="uppercase">service</small>
                                <small className="uppercase">$69</small>
                            </div>
                            <hr />
                            <div>
                                <strong>total</strong>
                                <strong>$69</strong>
                            </div>
                            <br />
                            <div>
                            <strong>discount</strong>
                            <button className="btn black">check</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SingleTable
